echo "Pulling changes to remote server"
cd recipe-storage
git pull

cd back-end
echo "Restarting server"
forever stop 3
forever start server.js

exit
echo "Done"