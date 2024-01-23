#!/bin/bash
BLUE='\033[0;34m'
BBLUE='\033[1;34m' #BOLD
PURPLE='\033[0;35m'
RED='\033[0;31m'
BRED='\033[1;31m' #BOLD
GREEN='\033[0;32m'
BGREEN='\033[1;32m' #BOLD
GRAY='\033[1;30m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building workflow package...${NC}"
yarn build

echo -en "${BLUE}Creating new folder in example node_modules...${NC}"
rm -rf "./example/node_modules/@brightlayer-ui/react-native-auth-workflow"
mkdir -p "./example/node_modules/@brightlayer-ui/react-native-auth-workflow"

echo -e "${GREEN}Done${NC}"

echo -en "${BLUE}Copying build output into example node_modules...${NC}";
cp -r ./package.json ./example/node_modules/@brightlayer-ui/react-native-auth-workflow/package.json
cp -r ./lib/. ./example/node_modules/@brightlayer-ui/react-native-auth-workflow/lib

echo -e "${GREEN}Done${NC}"

echo -en "\r\n${BLUE}Linking Workflows to example: ${NC}"
if [ ! -f ./example/node_modules/@brightlayer-ui/react-native-auth-workflow/package.json ]; then echo -e "${BRED}Not Linked${NC}" && exit 1; fi
if [ ! -s ./example/node_modules/@brightlayer-ui/react-native-auth-workflow ];
    then
        if [ ! -f ./example/node_modules/@brightlayer-ui/react-native-auth-workflow/lib/commonjs/index.js ];
        then echo -e "${BRED}Not Linked${NC}" && exit 1;
        fi;
fi

echo -e "${GRAY}Complete${NC}\r\n"