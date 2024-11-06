use clap::Parser;
use qrypto::{
    command::{Cli, Command},
    error,
};
use std::process;

fn main() -> error::Result<()> {
    let cmd = Cli::parse();

    let result = match cmd.cmd {
        Command::Keygen(keygenerator) => keygenerator.gen(),
        Command::Sign(signer) => signer.sign(),
        Command::Verify(verifier) => verifier.verify(),
        Command::Encapsulate(encapsulator) => encapsulator.encapsulate(),
        Command::Decapsulate(decapsulator) => decapsulator.decapsulate(),
    };

    if let Err(err) = &result {
        eprintln!("{}", err);
        process::exit(err.status_code().into());
    }

    Ok(())
}
