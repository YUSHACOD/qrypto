use std::{
    fs::OpenOptions,
    io::{Read, Write},
};

pub fn read_bytes(file: &Option<String>, bytes: &mut Vec<u8>) -> std::io::Result<usize> {
    let mut file = if let Some(filename) = file {
        Some(OpenOptions::new().read(true).open(filename)?)
    } else {
        None
    };

    match &mut file {
        None => std::io::stdin().read(bytes),
        Some(fd) => {
            let len = fd.metadata()?.len();
            bytes.resize(len as usize, 0);
            fd.read(bytes)
        }
    }
}

pub fn write_bytes(file: &Option<String>, bytes: &[u8]) -> std::io::Result<usize> {
    let mut file = if let Some(filename) = file {
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
    match &mut file {
        None => std::io::stdout().write(bytes),
        Some(fd) => fd.write(bytes),
    }
}
