const http = require("http"); //for built-in http module
const fs = require("fs"); //for file systems operation
const path = require("path"); //for handling file paths
const express = require("express"); //packages

const DATA_FILE = path.join(__dirname, "data.json");

//Function to read data from JSON File
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Data reading has error", error);
        return [];
    }
}

//Function to write data to JSON File
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

//Create HTTP server
const server = http.createServer((req, res) => {
    const urlParts = req.url.split("/")
    const id = urlParts[2]; //extract id if present
    let items = readData(); //read items from json file

    //Handling Get Method Request
    switch(req.method){
        case "GET":
            if(urlParts[1] === "items"){
                //retrieving item lists
                res.writeHead(200, {"Content-Type" : "application/json"});
                res.end(JSON.stringify(items));
            } else {
                res.writeHead(404);
                res.end("Not Found");
            }
            break;

            //Handling POST Method Request
            case "POST":
                if(urlParts[1] === "items"){
                    let body = " "; //add new item
                    req.on("data", chunk => {
                        body += chunk.toString(); //convert buffer to string
                    });
                    req.on("end", () => {
                        const newItem = JSON.parse(body);
                        items.push(newItem);
                        writeData(items); //Update items to file
                        res.writeHead(201, {"Content-Type" : "application/json"});
                        res.end(JSON.stringify(newItem));
                    });
                } else {
                    res.writeHead(404);
                    res.end("Not Found");
                }
                break;

                //Handling PUT Method Request
                case "PUT" :
                    if (urlParts[1] === "items" && id){
                        //Updates existing item
                        const itemIndex = items.findIndex(item => item.id === id);
                        if(itemIndex !== -1){
                            let body = "";
                            req.on("data", chunk => {
                                body += chunk.toString();
                            });
                            req.on("end", () => {
                                const updatedItem = JSON.parse(body);
                                items[itemIndex] = updatedItem; //update the item
                                writeData(items); //write updated item to file
                                res.writeHead(200, {"Content-Type" : "application/json"});
                                res.end(JSON.stringify(updatedItem));
                            });
                        } else {
                            res.writeHead(404);
                            res.end("Item Not Found");
                        }
                    } else {
                        res.writeHead(404);
                        res.end("Not Found");
                    }
                    break;

                    //Handling DELETE Method Request
                    case "DELETE" :
                        if(urlParts[1] === "items" && id){
                            //remove an item
                            items = items.filter(items => item.id !== id);
                            writeData(items); //write uodated item to file
                            res.writeHead(204); //No content
                            res.end();
                        } else {
                            res.writeHead(404);
                            res.end("Not Found");
                        }
                        break;

                        default:
                            res.writeHead(405); //Method not allowed
                            res.end("Method Not Allowed");
                            break;
                        }
                    });

                    //Start Server  
                    server.listen(3000, "127.0.0.1" , () => {
                        console.log("Server is running at http://127.0.0.1:3000/");
                    });