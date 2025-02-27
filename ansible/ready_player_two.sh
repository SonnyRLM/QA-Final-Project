#!/bin/bash

bastion_public_ip=$(cd ~/QA-Final-Project/terraform || exit ; terraform output bastion_public_ip | tr -d '"')
jenkins_public_ip=$(cd ~/QA-Final-Project/terraform || exit ; terraform output jenkins_public_ip | tr -d '"')
testvm_private_ip=$(cd ~/QA-Final-Project/terraform || exit ; terraform output testvm_private_ip | tr -d '"')

echo "${bastion_public_ip}"
echo "${jenkins_public_ip}"
echo "${testvm_private_ip}"

destFile=~/QA-Final-Project/ansible/inventory.yaml
if [ -f "$destFile" ]; then
  rm $destFile
fi

touch $destFile
echo "
all:
  hosts:
    ${bastion_public_ip}:
    ${jenkins_public_ip}:
    ${testvm_private_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"~/.ssh/i_dont_give_a_ssh.pem\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

bastion:
  hosts:
     ${bastion_public_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"~/.ssh/i_dont_give_a_ssh.pem\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

jenkins:
  hosts:
    ${jenkins_public_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"~/.ssh/i_dont_give_a_ssh.pem\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

testvm:
  hosts:
    ${testvm_private_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"~/.ssh/i_dont_give_a_ssh.pem\"
    ansible_ssh_common_args: '-o StrictHostKeyChecking=no -o ProxyCommand=\"ssh -i ~/.ssh/i_dont_give_a_ssh.pem -W %h:%p -q ${bastion_public_ip}\"'

" >$destFile
cd ~/QA-Final-Project/ansible || exit ; ANSIBLE_STDOUT_CALLBACK=yaml ansible-playbook -v -i inventory.yaml playbook.yaml

ssh -i ~/.ssh/i_dont_give_a_ssh.pem -o StrictHostKeyChecking=no ubuntu@${jenkins_public_ip} '(sudo cat /home/jenkins/.jenkins/secrets/initialAdminPassword)' > JENKINS_PASS.txt
echo "http://${jenkins_public_ip}:8080/" >> JENKINS_PASS.txt
