pub enum FileType {
    KemPubKey,
    KemSecKey,
    KemCipherKey,
    KemSharedSec,
    SigPubKey,
    SigSecKey,
    Signature,
}

impl FileType {
    pub fn to_string(&self) -> String {
        match *self {
            Self::KemPubKey => "kem_pub_key".to_string(),
            Self::KemSecKey => "kem_sec_key".to_string(),
            Self::KemCipherKey => "kem_cipher_key".to_string(),
            Self::KemSharedSec => "kem_shared_secret".to_string(),
            Self::SigPubKey => "sig_pub_key".to_string(),
            Self::SigSecKey => "sig_sec_key".to_string(),
            Self::Signature => "signature".to_string(),
        }
    }
}
