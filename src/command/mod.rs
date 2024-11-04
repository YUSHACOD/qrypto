use clap::{Parser, Subcommand};

pub mod keygen;
pub mod sign;
pub mod verify;

/// A Quantum-Safe CLI program that streams files for encryption and decryption.
#[derive(Parser, Debug)]
pub struct Cli {
    /// Action to perform on the input file
    #[command(subcommand)]
    pub cmd: Command,
}

#[derive(Subcommand, Clone, Debug)]
pub enum Command {
    /// generate a key, from pure random bytes.
    Keygen(keygen::KeyGen),

    /// sign a file
    Sign(sign::Sign),

    /// verify a file
    Verify(verify::Verify),
}
