use crate::{error, ioutils::IO};
use crate::crypto::algorithms::KemAlgorithms;
use clap::Parser;

#[derive(Parser, Debug, Clone)]
pub struct Seal {
    /// (optional) decrypted file, read from stdin by default
    #[arg(short, long)]
    decrypted_file: Option<String>,

    /// (optional) encrypted file, write to stdout by default
    #[arg(short, long)]
    encrypted_file: Option<String>,

    /// public key file, read (the first) 32 byte from stdin by default
    #[arg(short, long)]
    public_key: Option<String>,

    /// Kem Algorithm to use, default Kyber512
    #[arg(value_enum, default_value_t = KemAlgorithms::Kyber512)]
    algorithm: KemAlgorithms,
}

impl Seal {
    pub fn seal(&self) -> error::Result<()> {
        oqs::init();
        let mut io = IO::new(&self.decrypted_file, &self.encrypted_file, &self.public_key, &None)?;

        let kemalg = oqs::kem::Kem::new(self.algorithm.to_oqs_enum())?;
        let (kem_ct, b_kem_ss) = kemalg.encapsulate(&kem_pk)?;
        // You Can make public key refrence using the api 


        Ok(())
    }
}
