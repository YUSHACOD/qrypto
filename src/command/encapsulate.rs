use crate::{crypto::algorithms::KemAlgorithms, error, ioutils};
use clap::Parser;
use oqs;

/// Used for Key Exchange Mechanism
#[derive(Parser, Debug, Clone)]
pub struct Encapsulate {
    /// KEM public key
    #[arg(long)]
    kem_pub_key: String,

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

impl Encapsulate {
    pub fn encapsulate(&self) -> error::Result<()> {
        oqs::init();
        let kemalg = oqs::kem::Kem::new(self.algorithm.to_oqs_enum())?;

        let mut pub_key_buffer: Vec<u8> = Vec::new();
        ioutils::read_bytes(&Some(self.kem_pub_key.clone()), pub_key_buffer.as_mut())?;

        if let Some(pub_key) = kemalg.public_key_from_bytes(pub_key_buffer.as_slice()) {
            let (kem_ct, kem_ss) = kemalg.encapsulate(pub_key)?;

            ioutils::write_bytes(
                &Some(self.kem_cipher_key.clone()),
                kem_ct.into_vec().as_slice(),
            )?;

            ioutils::write_bytes(
                &Some(self.kem_shared_key.clone()),
                kem_ss.into_vec().as_slice(),
            )?;

            Ok(())
        } else {
            return Err(error::Error::Other(
                "Some error occurred check given public key".to_string(),
            ));
        }
    }
}
