use crate::{crypto::algorithms::KemAlgorithms, error, ioutils::IO};
use clap::Parser;
use oqs;

/// If no option, rng...
#[derive(Parser, Debug, Clone)]
pub struct KeyGen {
    /// (Optional) File to write out, default stdout
    #[arg(short, long)]
    public_key: Option<String>,

    /// (Optional) File to write out, default stdout
    #[arg(short, long)]
    secret_key: Option<String>,

    /// (Optional) Kem Algorithm to use, default Kyber512
    #[arg(value_enum, default_value_t = KemAlgorithms::Kyber512)]
    algorithm: KemAlgorithms,
}

impl KeyGen {
    pub fn gen(&self) -> error::Result<()> {
        oqs::init();
        let mut io = IO::new(&None, &None, &self.public_key, &self.secret_key)?;

        let kemalg = oqs::kem::Kem::new(self.algorithm.to_oqs_enum())?;
        let (public_key, secret_key) = kemalg.keypair()?;

        io.write_bytes_public_key(public_key.into_vec().as_slice())?;
        io.write_bytes_secret_key(secret_key.into_vec().as_slice())?;

        Ok(())
    }
}
