from typing import Annotated

from email_validator import EmailNotValidError, validate_email
from pydantic import BeforeValidator


def normalize_email(value: str) -> str:
    email = str(value).strip().lower()
    try:
        return validate_email(
            email,
            check_deliverability=False,
            test_environment=True,
        ).normalized
    except EmailNotValidError as exc:
        raise ValueError(str(exc)) from exc


AppEmailStr = Annotated[str, BeforeValidator(normalize_email)]
