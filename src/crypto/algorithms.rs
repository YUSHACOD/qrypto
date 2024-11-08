use clap::ValueEnum;
use oqs::{kem, sig};

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum)]
pub enum KeyType {
    Kem,
    Signature,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum)]
pub enum KemAlgorithms {
    BikeL1,
    BikeL3,
    BikeL5,
    ClassicMcEliece348864,
    ClassicMcEliece348864f,
    ClassicMcEliece460896,
    ClassicMcEliece460896f,
    ClassicMcEliece6688128,
    ClassicMcEliece6688128f,
    ClassicMcEliece6960119,
    ClassicMcEliece6960119f,
    ClassicMcEliece8192128,
    ClassicMcEliece8192128f,
    Hqc128,
    Hqc192,
    Hqc256,
    Kyber512,
    Kyber768,
    Kyber1024,
    NtruPrimeSntrup761,
    FrodoKem640Aes,
    FrodoKem640Shake,
    FrodoKem976Aes,
    FrodoKem976Shake,
    FrodoKem1344Aes,
    FrodoKem1344Shake,
}

#[allow(bindings_with_variant_name)]
impl KemAlgorithms {
    pub fn to_oqs_enum(&self) -> kem::Algorithm {
        match *self {
            Self::BikeL1 => kem::Algorithm::BikeL1,
            Self::BikeL3 => kem::Algorithm::BikeL3,
            Self::BikeL5 => kem::Algorithm::BikeL5,
            Self::ClassicMcEliece348864 => kem::Algorithm::ClassicMcEliece348864,
            Self::ClassicMcEliece348864f => kem::Algorithm::ClassicMcEliece348864f,
            Self::ClassicMcEliece460896 => kem::Algorithm::ClassicMcEliece460896,
            Self::ClassicMcEliece460896f => kem::Algorithm::ClassicMcEliece460896f,
            Self::ClassicMcEliece6688128 => kem::Algorithm::ClassicMcEliece6688128,
            Self::ClassicMcEliece6688128f => kem::Algorithm::ClassicMcEliece6688128f,
            Self::ClassicMcEliece6960119 => kem::Algorithm::ClassicMcEliece6960119,
            Self::ClassicMcEliece6960119f => kem::Algorithm::ClassicMcEliece6960119f,
            Self::ClassicMcEliece8192128 => kem::Algorithm::ClassicMcEliece8192128,
            Self::ClassicMcEliece8192128f => kem::Algorithm::ClassicMcEliece8192128f,
            Self::Hqc128 => kem::Algorithm::Hqc128,
            Self::Hqc192 => kem::Algorithm::Hqc192,
            Self::Hqc256 => kem::Algorithm::Hqc256,
            Self::Kyber512 => kem::Algorithm::Kyber512,
            Self::Kyber768 => kem::Algorithm::Kyber768,
            Self::Kyber1024 => kem::Algorithm::Kyber1024,
            Self::NtruPrimeSntrup761 => kem::Algorithm::NtruPrimeSntrup761,
            Self::FrodoKem640Aes => kem::Algorithm::FrodoKem640Aes,
            Self::FrodoKem640Shake => kem::Algorithm::FrodoKem640Shake,
            Self::FrodoKem976Aes => kem::Algorithm::FrodoKem976Aes,
            Self::FrodoKem976Shake => kem::Algorithm::FrodoKem976Shake,
            Self::FrodoKem1344Aes => kem::Algorithm::FrodoKem1344Aes,
            Self::FrodoKem1344Shake => kem::Algorithm::FrodoKem1344Shake,
        }
    }

    pub fn to_string(&self) -> String {
        match *self {
            Self::BikeL1 => "bike_l1".to_string(),
            Self::BikeL3 => "bike_l3".to_string(),
            Self::BikeL5 => "bike_l5".to_string(),
            Self::ClassicMcEliece348864 => "classic_mc_eliece_348864".to_string(),
            Self::ClassicMcEliece348864f => "classic_mc_eliece_348864f".to_string(),
            Self::ClassicMcEliece460896 => "classic_mc_eliece_460896".to_string(),
            Self::ClassicMcEliece460896f => "classic_mc_eliece_460896f".to_string(),
            Self::ClassicMcEliece6688128 => "classic_mc_eliece_6688128".to_string(),
            Self::ClassicMcEliece6688128f => "classic_mc_eliece_6688128f".to_string(),
            Self::ClassicMcEliece6960119 => "classic_mc_eliece_6960119".to_string(),
            Self::ClassicMcEliece6960119f => "classic_mc_eliece_6960119f".to_string(),
            Self::ClassicMcEliece8192128 => "classic_mc_eliece_8192128".to_string(),
            Self::ClassicMcEliece8192128f => "classic_mc_eliece_8192128f".to_string(),
            Self::Hqc128 => "hqc_128".to_string(),
            Self::Hqc192 => "hqc_192".to_string(),
            Self::Hqc256 => "hqc_256".to_string(),
            Self::Kyber512 => "kyber_512".to_string(),
            Self::Kyber768 => "kyber_768".to_string(),
            Self::Kyber1024 => "kyber_1024".to_string(),
            Self::NtruPrimeSntrup761 => "ntru_prime_sntrup_761".to_string(),
            Self::FrodoKem640Aes => "frodo_kem_640_aes".to_string(),
            Self::FrodoKem640Shake => "frodo_kem_640_shake".to_string(),
            Self::FrodoKem976Aes => "frodo_kem_976_aes".to_string(),
            Self::FrodoKem976Shake => "frodo_kem_976_shake".to_string(),
            Self::FrodoKem1344Aes => "frodo_kem_1344_aes".to_string(),
            Self::FrodoKem1344Shake => "frodo_kem_1344_shake".to_string(),
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum)]
pub enum SigAlgorithms {
    Dilithium2,
    Dilithium3,
    Dilithium5,
    Falcon512,
    Falcon1024,
    SphincsSha2128fSimple,
    SphincsSha2128sSimple,
    SphincsSha2192fSimple,
    SphincsSha2192sSimple,
    SphincsSha2256fSimple,
    SphincsSha2256sSimple,
    SphincsShake128fSimple,
    SphincsShake128sSimple,
    SphincsShake192fSimple,
    SphincsShake192sSimple,
    SphincsShake256fSimple,
    SphincsShake256sSimple,
}

#[allow(bindings_with_variant_name)]
impl SigAlgorithms {
    pub fn to_oqs_enum(&self) -> sig::Algorithm {
        match *self {
            Self::Dilithium2 => sig::Algorithm::Dilithium2,
            Self::Dilithium3 => sig::Algorithm::Dilithium3,
            Self::Dilithium5 => sig::Algorithm::Dilithium5,
            Self::Falcon512 => sig::Algorithm::Falcon512,
            Self::Falcon1024 => sig::Algorithm::Falcon1024,
            Self::SphincsSha2128fSimple => sig::Algorithm::SphincsSha2128fSimple,
            Self::SphincsSha2128sSimple => sig::Algorithm::SphincsSha2128sSimple,
            Self::SphincsSha2192fSimple => sig::Algorithm::SphincsSha2192fSimple,
            Self::SphincsSha2192sSimple => sig::Algorithm::SphincsSha2192sSimple,
            Self::SphincsSha2256fSimple => sig::Algorithm::SphincsSha2256fSimple,
            Self::SphincsSha2256sSimple => sig::Algorithm::SphincsSha2256sSimple,
            Self::SphincsShake128fSimple => sig::Algorithm::SphincsShake128fSimple,
            Self::SphincsShake128sSimple => sig::Algorithm::SphincsShake128sSimple,
            Self::SphincsShake192fSimple => sig::Algorithm::SphincsShake192fSimple,
            Self::SphincsShake192sSimple => sig::Algorithm::SphincsShake192sSimple,
            Self::SphincsShake256fSimple => sig::Algorithm::SphincsShake256fSimple,
            Self::SphincsShake256sSimple => sig::Algorithm::SphincsShake256sSimple,
        }
    }

    pub fn to_string(&self) -> String {
        match *self {
            Self::Dilithium2 => "dilithium_2".to_string(),
            Self::Dilithium3 => "dilithium_3".to_string(),
            Self::Dilithium5 => "dilithium_5".to_string(),
            Self::Falcon512 => "falcon_512".to_string(),
            Self::Falcon1024 => "falcon_1024".to_string(),
            Self::SphincsSha2128fSimple => "sphincs_sha2_128f_simple".to_string(),
            Self::SphincsSha2128sSimple => "sphincs_sha2_128s_simple".to_string(),
            Self::SphincsSha2192fSimple => "sphincs_sha2_192f_simple".to_string(),
            Self::SphincsSha2192sSimple => "sphincs_sha2_192s_simple".to_string(),
            Self::SphincsSha2256fSimple => "sphincs_sha2_256f_simple".to_string(),
            Self::SphincsSha2256sSimple => "sphincs_sha2_256s_simple".to_string(),
            Self::SphincsShake128fSimple => "sphincs_shake_128f_simple".to_string(),
            Self::SphincsShake128sSimple => "sphincs_shake_128s_simple".to_string(),
            Self::SphincsShake192fSimple => "sphincs_shake_192f_simple".to_string(),
            Self::SphincsShake192sSimple => "sphincs_shake_192s_simple".to_string(),
            Self::SphincsShake256fSimple => "sphincs_shake_256f_simple".to_string(),
            Self::SphincsShake256sSimple => "sphincs_shake_256s_simple".to_string(),
        }
    }
}
