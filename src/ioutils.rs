use clap::Parser;
use std::{
    fs::{File, OpenOptions},
    io::{Read, Write},
};

#[derive(Parser, Debug, Clone)]
pub struct FileArg {
    /// (optional) input file, read from stdin by default
    #[arg(short, long)]
    pub input_file: Option<String>,

    /// (optional) output file, write to stdout by default
    #[arg(short, long)]
    pub output_file: Option<String>,

    /*
    /// (optional) additional authenticated data
    #[arg(short, long)]
    pub aad: Option<String>,
    */
    /// (optional) key file, read (the first) 32 byte from stdin by default
    #[arg(short, long)]
    pub key: Option<String>,
}

#[derive(Debug)]
pub struct IO {
    encrypted_file: Option<File>,
    decrypted_file: Option<File>,
    public_key: Option<File>,
    secret_key: Option<File>,
}

impl IO {
    pub fn new(
        encrypted_file: &Option<String>,
        decrypted_file: &Option<String>,
        public_key: &Option<String>,
        secret_key: &Option<String>,
    ) -> std::io::Result<Self> {
        let encrypted_file = if let Some(filename) = encrypted_file {
            Some(
                OpenOptions::new()
                    .create(true)
                    .truncate(true)
                    .write(true)
                    .open(filename)?,
            )
        } else {
            None
        };

        let decrypted_file = if let Some(filename) = decrypted_file {
            Some(
                OpenOptions::new()
                    .create(true)
                    .truncate(true)
                    .write(true)
                    .open(filename)?,
            )
        } else {
            None
        };

        let public_key = if let Some(filename) = public_key {
            Some(
                OpenOptions::new()
                    .create(true)
                    .truncate(true)
                    .write(true)
                    .open(filename)?,
            )
        } else {
            None
        };

        let secret_key = if let Some(filename) = secret_key {
            Some(
                OpenOptions::new()
                    .create(true)
                    .truncate(true)
                    .write(true)
                    .open(filename)?,
            )
        } else {
            None
        };

        Ok(Self {
            encrypted_file,
            decrypted_file,
            public_key,
            secret_key,
        })
    }

    pub fn read_bytes_encrypted_file(&mut self, bytes: &mut [u8]) -> std::io::Result<usize> {
        match &mut self.encrypted_file {
            None => std::io::stdin().read(bytes),
            Some(fd) => fd.read(bytes),
        }
    }

    pub fn read_bytes_public_key(&mut self, bytes: &mut [u8]) -> std::io::Result<usize> {
        match &mut self.public_key {
            None => std::io::stdin().read(bytes),
            Some(fd) => fd.read(bytes),
        }
    }

    pub fn read_bytes_secret_key(&mut self, bytes: &mut [u8]) -> std::io::Result<usize> {
        match &mut self.secret_key {
            None => std::io::stdin().read(bytes),
            Some(fd) => fd.read(bytes),
        }
    }

    pub fn write_bytes_encrypted_file(&mut self, bytes: &[u8]) -> std::io::Result<usize> {
        match &mut self.encrypted_file {
            None => std::io::stdout().write(bytes),
            Some(fd) => fd.write(bytes),
        }
    }

    pub fn write_bytes_decrypted_file(&mut self, bytes: &[u8]) -> std::io::Result<usize> {
        match &mut self.decrypted_file {
            None => std::io::stdout().write(bytes),
            Some(fd) => fd.write(bytes),
        }
    }

    pub fn write_bytes_public_key(&mut self, bytes: &[u8]) -> std::io::Result<usize> {
        match &mut self.public_key {
            None => std::io::stdout().write(bytes),
            Some(fd) => fd.write(bytes),
        }
    }

    pub fn write_bytes_secret_key(&mut self, bytes: &[u8]) -> std::io::Result<usize> {
        match &mut self.secret_key {
            None => std::io::stdout().write(bytes),
            Some(fd) => fd.write(bytes),
        }
    }
}
