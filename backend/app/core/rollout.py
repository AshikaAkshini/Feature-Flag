import hashlib

def get_bucket(user_id: str, flag_key: str) -> int:
    # Combine user_id and flag_key
    key = f"{user_id}:{flag_key}"

    # Create a hash
    hash_value = hashlib.md5(key.encode()).hexdigest()

    # Convert hash to a number between 0 and 99
    bucket = int(hash_value, 16) % 100

    return bucket