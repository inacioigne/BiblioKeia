from pydantic import BaseSettings
# from pydantic import (
#     BaseModel,
#     BaseSettings,
#     PyObject,
#     RedisDsn,
#     PostgresDsn,
#     AmqpDsn,
#     Field,

# )

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    url: str = "http://localhost"