#!/bin/bash
HOST=$1
PROJECT_DIRECTORY=$2
FILES=$(ls ${PROJECT_DIRECTORY}/database/*.json | sort -n -t _ -k 2)

while : ; do
    CHECK=$(mongo --host localhost --username productListUser --password productListPassword --authenticationDatabase admin promotions --eval 'db.version() 2> /dev/null')
    if [[ $CHECK == *"MongoDB server version"* ]]
    then
        break
    fi
    echo "[$(date)] Checking connection to database from localhost... 😴"
    sleep 1
done
echo ""
echo "[====== Cargando base de datos ======]"

for AFILE in ${FILES[@]}
do
    echo -e "[$(date)] Processing \t$AFILE"
    COLLECTION=`echo $AFILE | sed -n 's/.*\-\(.*\).json/\1/p'`
    mongoimport --host localhost --username productListUser --password productListPassword --authenticationDatabase admin --db promotions --collection ${COLLECTION} --mode upsert --file ${AFILE}
    echo "[====== Base de datos cargada correctamente ======]"
    echo ""
done

echo ""
echo "¡¡Todo Listo, App Palindromo 🤖¡¡"
echo "Ingreso Front ✅:"
echo "http://127.0.0.1:80"
echo ""
echo "Ruta de API ✅:"
echo "http://127.0.0.1:3000"
echo ""
