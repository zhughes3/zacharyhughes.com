
# Environment Setup
1. If A record was not created, create A record in Route 53 assigning VM's Public IP to `<server_name>.brightwolf.net`.
2. If you don't have the Albatross repo, clone it from https://bitbucket.brightwolf.org/projects/DEV/repos/albatross/browse.
3. Create new files for each environment in the Albatross `/env` directory (e.g. lincoln-dev, lincoln-int, lincoln-pro).
The env file looks like this, but using the specific cloud provider code and customer code of your project:

```bash
# env/lincoln-dev
[backend]
lion-c2855-001.brightwolf.net server_hostname=lion-c2855-001.brightwolf.net

[ubuntu-server]
lion-c2855-001.brightwolf.net

[ubuntu-server:vars]
Xmx=4096m  
Xms=1024m
```
4. If not set up yet, set the `roles_path` config variable in `/etc/ansible/ansible.cfg`. 

```
roles_path = /etc/ansible/roles:~/bitbucket/dev/albatross/roles
```
5. Install Python onto the VM.
```bash
# from Albatross root
ansible-playbook -i env/lincoln-int playbooks/ubuntu-server/bootstrap.yml
```
6. Configure the VM with normal package and config defaults.
```bash
ansible-playbook -i env/lincoln-int playbooks/ubuntu-server/configure.yml
```
7. Add authorized keys.
```bash
ansible-playbook -i env/lincoln-int playbooks/user/add-authorized-key.yml -e target_user=strandz -e source_user=colony -e aws_profile=default -e colony_s3_bucket=bw-colony
ansible-playbook -i env/lincoln-int playbooks/user/add-authorized-key.yml -e target_user=strandz -e source_user=scottadm -e aws_profile=default -e colony_s3_bucket=bw-colony
ansible-playbook -i env/lincoln-int playbooks/user/add-authorized-key.yml -e target_user=strandz -e source_user=csurface -e aws_profile=default -e colony_s3_bucket=bw-colony
```
8. SSH onto the box, edit the `/opt/strandz/config.properties`
```bash
# generate via a 24-character lastpass password generator
com.brightwolf.cloud.auth.api.key=i6w6c350I3cGdk37Dwn4JIkP
# the rest can be found out by looking at individual resource properties in azure  
strandz.db.full.connection.url=jdbc:mysql://lion-c2855-503d.mysql.database.azure.com:3306/strandz?user=strandz@lion-c2855-503d&password=2bCVT6yJxrA41rT9&cachePrepStmts=true&useServerPrepStmt=true&cacheResultSetMetadata=true&useSSL=true&requireSSL=false
```
9. For the repository that you are basing the build off of, you might need to create some files if they don't exist. You can copy these from a previous build.

```txt
.
|-- com.brightwolf.lincoln.product
|   |-- LincolnElectricAzureMysql.product
|-- com.brightwolf.lincoln.releng
|   |-- archive-build.sh
	|-- build-jenkins.xml
	|-- build-pde.sh
``` 
10. Create or update the Cloud-PDE and Cloud-Deploy deploy jobs on Jenkins. If you need to create, copy from the most recent new job and change the relevant configuration variables.
11. Build job.
12. Make sure you add the `strandz` database to the SQL Server.
13. Upload the SSH key onto the box.
```bash
scp server.key <VM>:/etc/ssl/private/
ssh ...
chown root:ssl-cert server.key
```
14. Restart Tomcat.
```bash
monit restart tomcat
```
15. Verify it works by tailing logs at `/var/log/tomcat8/catalina.out` and making sure the webapp is working by going to the web root in the browser.
16. If it spits out any errors speaking about memory settings, you need to get the memory capacity of the VM and adjust the memory settings in `/etc/default/tomcat8` where `ms ::= minimum memory settings` and `mx ::= max memory settings`