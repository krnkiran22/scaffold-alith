#!/bin/bash

# Alith AI Chat Application - Quick Install Script
# This script sets up the Alith AI Chat Application with a single command

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "git is not installed. Please install git"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "All requirements met!"
}

# Get project name from user
get_project_name() {
    if [ -z "$1" ]; then
        read -p "Enter your project name (default: alith-chat): " PROJECT_NAME
        PROJECT_NAME=${PROJECT_NAME:-alith-chat}
    else
        PROJECT_NAME=$1
    fi
    
    # Validate project name
    if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
        print_error "Project name can only contain letters, numbers, hyphens, and underscores"
        exit 1
    fi
}

# Clone and setup project
setup_project() {
    print_status "Setting up Alith AI Chat Application..."
    
    # Clone the repository
    if [ -d "$PROJECT_NAME" ]; then
        print_error "Directory '$PROJECT_NAME' already exists!"
        exit 1
    fi
    
    print_status "Cloning repository..."
    git clone https://github.com/krnkiran22/alith.git "$PROJECT_NAME"
    cd "$PROJECT_NAME"
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm install
    
    # Setup environment file
    print_status "Setting up environment file..."
    cp .env.example .env
    
    print_success "Project setup completed!"
}

# Setup API key
setup_api_key() {
    print_status "Setting up Groq API key..."
    print_warning "You need a Groq API key to use this application."
    echo "Get your free API key from: https://console.groq.com/keys"
    echo ""
    
    read -p "Enter your Groq API key (or press Enter to skip): " API_KEY
    
    if [ -n "$API_KEY" ]; then
        # Update .env file with the API key
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/your_groq_api_key_here/$API_KEY/" .env
        else
            # Linux
            sed -i "s/your_groq_api_key_here/$API_KEY/" .env
        fi
        print_success "API key configured!"
    else
        print_warning "API key skipped. You can add it later in the .env file."
    fi
}

# Final instructions
show_final_instructions() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📁 Project created in: $(pwd)"
    echo ""
    echo "🚀 To start your application:"
    echo "   cd $PROJECT_NAME"
    echo "   npm run dev"
    echo ""
    echo "🌐 Your application will be available at:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:3001"
    echo ""
    if [ -z "$API_KEY" ]; then
        echo "⚠️  Don't forget to add your Groq API key to the .env file!"
        echo "   Edit .env and replace 'your_groq_api_key_here' with your actual API key"
        echo ""
    fi
    echo "📖 For more information, check the README.md file"
    echo ""
}

# Main execution
main() {
    echo "🤖 Alith AI Chat Application Installer"
    echo "======================================"
    echo ""
    
    check_requirements
    get_project_name "$1"
    setup_project
    setup_api_key
    show_final_instructions
}

# Run main function with all arguments
main "$@"
