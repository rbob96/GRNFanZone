# Team V Professional Software Development Project


## Useful Snippets

Git repository URI:
    http://130.209.251.78/git/teamproject

Trac URL:
    http://130.209.251.78/trac

Jenkins URL:
    http://130.209.251.78:8080

Google Docs Team Project Folder:
    https://drive.google.com/open?id=0B5LCiApIyry6ZUVVSGhJOURHaTQ




Create account for trac: 
    htpasswd /home/ubuntu/trac.htpasswd {USERNAME}

Script to log you into the VM without manually SSHing twice
    ssh {MATRIC_NUM}@sibu.dcs.gla.ac.uk -t "command; ssh -i {VM_KEY.pem} {VM_USERNAME}@130.209.251.78 -t 'command; cd ~/; bash'"

Log in to the lab and open graphical browser
    ssh -XC sibu.dcs.gla.ac.uk