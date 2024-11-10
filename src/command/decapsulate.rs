use crate::{crypto::{algorithms::KemAlgorithms, file_type::FileType}, error, ioutils};
use clap::Parser;
use oqs;

/// Used for Key Exchange Mechanism
#[derive(Parser, Debug, Clone)]
pub struct Decapsulate {
    /// KEM secret key
    #[arg(long)]
    kem_secret_key: String,

    /// KEM cipher key file
    #[arg(long)]
    kem_cipher_key: String,

    /// File for KEM shared secret
    #[arg(long)]
    kem_shared_key: String,

    /// (Optional) Kem Algorithm to use, default Kyber512
    #[arg(value_enum, default_value_t = KemAlgorithms::Kyber512)]
    algorithm: KemAlgorithms,
}

impl Decapsulate {
    pub fn decapsulate(&self) -> error::Result<()> {
        oqs::init();
        let kemalg = oqs::kem::Kem::new(self.algorithm.to_oqs_enum())?;

        let mut secret_key_buffer: Vec<u8> = Vec::new();
        ioutils::read_bytes(
            &Some(self.kem_secret_key.clone()),
            secret_key_buffer.as_mut(),
            self.algorithm.to_string(),
            FileType::KemSecKey,
        )?;

        let mut cipher_key_buffer: Vec<u8> = Vec::new();
        ioutils::read_bytes(
            &Some(self.kem_cipher_key.clone()),
            cipher_key_buffer.as_mut(),
            self.algorithm.to_string(),
            FileType::KemCipherKey
        )?;

        if let Some(secret_key) = kemalg.secret_key_from_bytes(secret_key_buffer.as_slice()) {
            if let Some(cipher_key) = kemalg.ciphertext_from_bytes(cipher_key_buffer.as_slice()) {
                let shared_secret = kemalg.decapsulate(secret_key, cipher_key)?;

                ioutils::write_bytes(
                    &Some(self.kem_shared_key.clone()),
                    shared_secret.into_vec().as_slice(),
                    self.algorithm.to_string().as_str(),
                    FileType::KemSharedSec,
                )?;

                Ok(())
            } else {
                return Err(error::Error::Other(
                    "Some error occurred check given cipher key".to_string(),
                ));
            }
        } else {
            return Err(error::Error::Other(
                "Some error occurred check given public key".to_string(),
            ));
        }
    }
}
