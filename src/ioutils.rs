use crate::crypto::file_type::FileType;
use hex;
use std::{
    fs::OpenOptions,
    io::{self, Read, Write},
};

pub fn read_bytes(
    file: &Option<String>,
    bytes: &mut Vec<u8>,
    algorithm: String,
    file_type: FileType,
) -> std::io::Result<usize> {
    let mut file = if let Some(filename) = file {
        Some(OpenOptions::new().read(true).open(filename)?)
    } else {
        None
    };

    let mut content = String::new();
    match &mut file {
        None => {
            std::io::stdin().read_to_string(&mut content)?;
        }
        Some(fd) => {
            fd.read_to_string(&mut content)?;
        }
    }

    let begin_section = format!("===begin_{algorithm}_{}===", file_type.to_string(),);
    let end_section = format!("===end_{algorithm}_{}===", file_type.to_string(),);

    if content.contains(begin_section.as_str()) && content.contains(end_section.as_str()) {
        content = content.replace(begin_section.as_str(), "");
        content = content.replace(end_section.as_str(), "");
        content = content.replace("\n", "");

        // Convert the hex string back to bytes
        *bytes = hex::decode(&content).map_err(|e| {
            io::Error::new(
                io::ErrorKind::InvalidData,
                format!("Invalid hex data: {}", e),
            )
        })?;

        Ok(bytes.len())
    } else {
        Err(io::Error::new(
            io::ErrorKind::InvalidData,
            "The File given is not of the proper algorithm or format.".to_string(),
        ))
    }
}

pub fn read_file(file: &Option<String>, bytes: &mut Vec<u8>) -> std::io::Result<usize> {
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

pub fn write_bytes(
    file: &Option<String>,
    bytes: &[u8],
    algorithm: &str,
    file_type: FileType,
) -> std::io::Result<usize> {
    let hex_string: String = bytes.iter().map(|byte| format!("{:02x}", byte)).collect();

    let formatted_hex: String = hex_string
        .as_bytes()
        .chunks(80)
        .map(|chunk| String::from_utf8_lossy(chunk).to_string() + "\n")
        .collect();

    // Create the sectioned format
    let content = format!(
        "===begin_{algorithm}_{}===\n{formatted_hex}===end_{algorithm}_{}===\n",
        file_type.to_string(),
        file_type.to_string(),
    );

    let mut file = if let Some(filename) = file {
        let mut filename = filename.clone();
        filename.push_str(".");
        filename.push_str(algorithm);
        filename.push_str(".");
        filename.push_str(file_type.to_string().as_str());

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
        None => std::io::stdout().write(content.as_bytes()),
        Some(fd) => fd.write(content.as_bytes()),
    }
}
