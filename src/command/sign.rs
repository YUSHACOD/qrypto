use crate::{
    crypto::{algorithms::SigAlgorithms, file_type::FileType},
    error, ioutils,
};
use clap::Parser;
use oqs;

/// If no option, rng...
#[derive(Parser, Debug, Clone)]
pub struct Sign {
    /// File to Sign
    #[arg(short, long)]
    file: String,

    /// (Optional) File to write signature to, default stdout
    #[arg(short, long)]
    signature_file: Option<String>,

    /// Secret key file for signing
    #[arg(long)]
    secret_key: String,

    /// (Optional) Sig Algorithm to use, default Dilithium2
    #[arg(value_enum, default_value_t = SigAlgorithms::Dilithium2)]
    algorithm: SigAlgorithms,
}

impl Sign {
    pub fn sign(&self) -> error::Result<()> {
        oqs::init();

        let sigalg = oqs::sig::Sig::new(self.algorithm.to_oqs_enum())?;

        let mut buffer: Vec<u8> = Vec::new();
        ioutils::read_file(&Some(self.file.clone()), &mut buffer)?;

        let mut secret_key_buffer: Vec<u8> = Vec::new();
        ioutils::read_bytes(
            &Some(self.secret_key.clone()),
            &mut secret_key_buffer,
            self.algorithm.to_string(),
            FileType::SigSecKey,
        )?;

        let signature =
            if let Some(secret_key) = sigalg.secret_key_from_bytes(secret_key_buffer.as_slice()) {
                Some(sigalg.sign(buffer.as_slice(), secret_key)?)
            } else {
                None
            };

        ioutils::write_bytes(
            &self.signature_file,
            signature.unwrap().into_vec().as_slice(),
            self.algorithm.to_string().as_str(),
            FileType::Signature,
        )?;

        Ok(())
    }
}
