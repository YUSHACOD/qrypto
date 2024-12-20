use clap::{Parser, Subcommand};

pub mod keygen;
pub mod sign;
pub mod encapsulate;
pub mod decapsulate;
pub mod verify;

/// A Quantum-Safe CLI program for KeyExchange and Signing Purposes.
#[derive(Parser, Debug)]
pub struct Cli {
    /// Availabe functions
    #[command(subcommand)]
    pub cmd: Command,
}

#[derive(Subcommand, Clone, Debug)]
pub enum Command {
    /// generate a key, from pure random bytes.
    Keygen(keygen::KeyGen),

    /// sign a file using secret key
    Sign(sign::Sign),

    /// verify a file using public key
    Verify(verify::Verify),

    /// encapsulate and create kem cipher key, shared secret
    Encapsulate(encapsulate::Encapsulate),

    /// decapsulate and get kem shared secret
    Decapsulate(decapsulate::Decapsulate),
}
