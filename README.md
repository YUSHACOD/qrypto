# Qrypto: A quantum safe Cryptography tool

A small cryptography tool that is a frontend for liboqs library. This tool is
step towards adoption of quantum safe algorithms in daily life.

## CLI Tool

A cli tool with key generation, signing, verification, encapsulation and
decapsulation functions for Key Exchange and Signature Mechanisms.

## A Rust Crate

A rust crate wrapping liboqs and the oqs crate which implements the following
things:

Proprietary Key and Signature File format, keys and signatures are stored as
hex values with header and footer descrbing the file and algorithm type.
