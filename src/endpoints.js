const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const axios = require('axios');

const addPeople = async (event) => {
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { nombre, altura, masaCorporal , colorCabello, colorPiel, colorOjos, fechaNacimiento, genero, hogar, ruta } = JSON.parse(event.body);
    const id = v4();

    const newPeople = {
        id,
        nombre,
        altura, 
        masaCorporal,
        colorCabello,
        colorPiel,
        colorOjos,
        fechaNacimiento,
        genero,
        hogar,
        ruta
    }

    await dynamodb
    .put({
      TableName: "peopleTable",
      Item: newPeople,
    })
    .promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newPeople)
    }
}

const getPeople = async (event) => {
    const parameter = event.pathParameters.number;
    let people;
    // valida que el rango para la busqueda de personas sea el correcto
    if(parameter <= 88){ // swapi solo tiene 88 personajes personas de star wars desconozco si hay mas :)
    const ruta = `https://swapi.py4e.com/api/people/${parameter}/`    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: 'peopleTable',
        FilterExpression : "contains(#ruta, :ruta)",
        ExpressionAttributeNames: { "#ruta": "ruta" },
        ExpressionAttributeValues: {
            ':ruta':ruta
        }
    };
    const result = await dynamodb.scan(params).promise()
    
    if(result.Count === 1){// si encuentra data solo devuelve la data que encontro
        people = result.Items
    }else{ // si no encuentra hace una peticion a swappi lo guarda para posteriormente devolverlo
        const id = v4();
        const responseSwappi = await axios.get(ruta)
        const newPeople = {
            id,
            nombre: responseSwappi.data.name,
            altura: responseSwappi.data.height,
            masaCorporal: responseSwappi.data.mass,
            colorCabello: responseSwappi.data.hair_color,
            colorPiel: responseSwappi.data.skin_color,
            colorOjos: responseSwappi.data.eye_color,
            fechaNacimiento: responseSwappi.data.birth_year,
            genero: responseSwappi.data.gender,
            hogar: responseSwappi.data.homeworld,
            ruta: ruta
        }
        await dynamodb
        .put({
        TableName: "peopleTable",
        Item: newPeople,
        }).promise();
        people = newPeople;
    }
    }else{
        people = "no more people"
    }
    return {
        status: 200,
        body: {
            people
        }
    }
    
}

module.exports = {
    addPeople,getPeople
}