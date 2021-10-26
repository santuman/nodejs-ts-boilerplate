FROM node:14.18.1-slim

LABEL maintainer="santsubcode@gmail.com"

# install few packages
RUN apt-get update && \
  apt-get install -y sudo \
  curl \
  git-core \
  gnupg \
  linuxbrew-wrapper \
  locales \
  zsh \
  wget \
  fonts-powerline \
  # set up locale
  && locale-gen en_US.UTF-8

# Setting up eslint prettier and typescript
RUN npm install --global eslint prettier typescript

USER node

ENV TERM xterm

# Set the default shell to bash rather than sh
ENV SHELL /bin/zsh

 # run the installation script
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# install powerlevel10k
RUN git clone https://github.com/romkatv/powerlevel10k.git ~/.oh-my-zsh/custom/themes/powerlevel10k

RUN cd $HOME && curl -fsSLO https://raw.githubusercontent.com/romkatv/dotfiles-public/master/.purepower

# zsh configuration
ADD .zshrc $HOME
