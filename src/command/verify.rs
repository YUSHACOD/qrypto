use crate::{
    crypto::{algorithms::SigAlgorithms, file_type::FileType},
    error, ioutils,
};
use clap::Parser;
use oqs;

/// Verify a File using Signature
#[derive(Parser, Debug, Clone)]
pub struct Verify {
    /// File to verify
    #[arg(short, long)]
    file: String,

    /// (Optional) Signature File
    #[arg(short, long)]
    signature_file: String,

    /// Public key file for verifying
    #[arg(long)]
    public_key: String,

    /// (Optional) Sig Algorithm to use
    #[arg(value_enum, default_value_t = SigAlgorithms::Dilithium2)]
    algorithm: SigAlgorithms,
}

impl Verify {
    pub fn verify(&self) -> error::Result<()> {
        oqs::init();

        let sigalg = oqs::sig::Sig::new(self.algorithm.to_oqs_enum())?;

        let mut buffer: Vec<u8> = Vec::new();
        ioutils::read_file(&Some(self.file.clone()), &mut buffer)?;

        let mut public_key_buffer: Vec<u8> = Vec::new();
        ioutils::read_bytes(
            &Some(self.public_key.clone()),
            &mut public_key_buffer,
            self.algorithm.to_string(),
            FileType::SigPubKey,
        )?;
        let public_key = sigalg
            .public_key_from_bytes(public_key_buffer.as_slice())
            .unwrap();

        let mut sign_buffer: Vec<u8> = Vec::new();
        ioutils::read_bytes(
            &Some(self.signature_file.clone()),
            &mut sign_buffer,
            self.algorithm.to_string(),
            FileType::Signature,
        )?;
        let signature = sigalg.signature_from_bytes(sign_buffer.as_slice()).unwrap();

        match sigalg.verify(buffer.as_slice(), signature, public_key) {
            Ok(_) => println!("VERIFIED."),
            Err(_) => println!("THE FILE IS TAMPERED WITH."),
        }

        Ok(())
    }
}
