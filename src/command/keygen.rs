use crate::{
    crypto::algorithms::{KemAlgorithms, KeyType, SigAlgorithms},
    error, ioutils,
};
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

    /// (Optional) Key type to generate, default Kem
    #[arg(value_enum, default_value_t = KeyType::Kem)]
    key_type: KeyType,

    /// (Optional) Kem Algorithm to use, default Kyber512
    #[arg(value_enum, default_value_t = KemAlgorithms::Kyber512)]
    algorithm_kem: KemAlgorithms,

    /// (Optional) Kem Algorithm to use, default Dilithium2
    #[arg(value_enum, default_value_t = SigAlgorithms::Dilithium2)]
    algorithm_sig: SigAlgorithms,
}

impl KeyGen {
    pub fn gen(&self) -> error::Result<()> {
        oqs::init();

        match self.key_type {
            KeyType::Kem => {
                let kemalg = oqs::kem::Kem::new(self.algorithm_kem.to_oqs_enum())?;
                let (public_key, secret_key) = kemalg.keypair()?;

                ioutils::write_bytes(&self.public_key, public_key.into_vec().as_slice())?;
                ioutils::write_bytes(&self.secret_key, secret_key.into_vec().as_slice())?;
            }
            KeyType::Signature => {
                let sigalg = oqs::sig::Sig::new(self.algorithm_sig.to_oqs_enum())?;
                let (public_key, secret_key) = sigalg.keypair()?;

                ioutils::write_bytes(&self.public_key, public_key.into_vec().as_slice())?;
                ioutils::write_bytes(&self.secret_key, secret_key.into_vec().as_slice())?;
            }
        }

        Ok(())
    }
}
