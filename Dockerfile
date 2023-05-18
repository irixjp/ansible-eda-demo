FROM quay.io/centos/centos:stream9

ENV APP_ROOT=/root/nodejs
WORKDIR ${APP_ROOT}

RUN dnf clean all && \
    dnf update -y && \
    dnf install -y --nodocs epel-release && \
    dnf install -y --nodocs tmux supervisor procps-ng java-17-openjdk && \
    dnf install -y --nodocs --allowerasing curl && \
    dnf module install -y --nodocs nodejs:18/development && \
    dnf install -y --nodocs python3 python3-pip && \
    dnf clean all && \
    npm install ws next-ui wscat --save && \
    ln -s $(pwd)/node_modules/wscat/bin/wscat /usr/bin/wscat && \
    pip install -U pip && \
    pip install ansible-core ansible-rulebook aiohttp && \
    ansible-galaxy collection install ansible.eda && \
    rm -rf ~/.cache/pip

COPY app.js data.js server.js index.html ${APP_ROOT}
COPY --chmod=755 device_ops.sh dummy_device.sh error_generator.sh monitoring.sh ${APP_ROOT}
COPY eda_rulebook.yaml eda_playbook_recover.yaml eda_playbook_rescan.yaml inventory ${APP_ROOT}
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 8080
EXPOSE 8081
EXPOSE 8082
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
