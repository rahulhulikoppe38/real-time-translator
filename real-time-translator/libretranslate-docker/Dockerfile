FROM python:3.11-slim

# Set environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system packages
RUN apt-get update && apt-get install -y \
    git curl wget unzip build-essential python3-dev libglib2.0-0 && \
    apt-get clean

# Install Python packages
RUN pip install --upgrade pip && \
    pip install libretranslate==1.3.9 argostranslate==1.8.0

# Download and install all translation models
RUN argos-translate-cli --update-package-index && \
    argos-translate-cli --install-all

# Expose port
EXPOSE 5000

# Start LibreTranslate with all models
CMD ["libretranslate", "--load-only=''", "--update-models"]
