FROM quay.io/centos/centos:stream9

RUN dnf clean all && \
    dnf update -y && \
    dnf install -y epel-release && \
    dnf install -y tmux supervisor procps-ng java-17-openjdk && \
    dnf install -y --allowerasing curl && \
    dnf module install -y nodejs:18/development && \
    dnf install -y python3 python3-pip && \
    dnf clean all

RUN mkdir -p /root/nodejs && \
    cd /root/nodejs && \
    npm install ws next-ui wscat --save && \
    ln -s $(pwd)/node_modules/wscat/bin/wscat /usr/bin/wscat && \
    pip install -U pip && \
    pip install ansible-core ansible-rulebook aiohttp && \
    ansible-galaxy collection install ansible.eda

COPY app.js data.js server.js index.html /root/nodejs/
COPY --chmod=755 device_ops.sh dummy_device.sh error_generator.sh monitoring.sh /root/nodejs/
COPY eda_rulebook.yaml eda_playbook_recover.yaml eda_playbook_rescan.yaml inventory /root/nodejs/
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 8080
EXPOSE 8081
EXPOSE 8082
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
