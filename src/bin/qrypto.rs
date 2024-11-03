use clap::Parser;
use qrypto::{
    command::{open, seal, Cli, Command},
    error,
};
use std::process;

fn main() -> error::Result<()> {
    let cmd = Cli::parse();

    let result = match cmd.cmd {
        //Command::Open(f) => open::open(&f),
        //Command::Seal(f) => seal::seal(&f),
        Command::Keygen(k) => k.gen(),
        _ => todo!("Open, Seal"),
    };

    if let Err(err) = &result {
        eprintln!("{}", err);
        process::exit(err.status_code().into());
    }

    Ok(())
}
