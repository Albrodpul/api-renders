var request = require("request");

var baseUrl = "http://localhost:8080/api/v1/renders";

describe("Renders API Server", function () {
    it("Get renders", function (done) {
        request.get(baseUrl, function (err, res, body) {
            expect(res.statusCode).toBe(200);
            var json = JSON.parse(body);
            expect(json.length).toBe(2);
            done();
        });
    });

    it("Get a render by id", function (done) {
        var id = "test";
        request.get(baseUrl + "?id=" + id, function (err, res, body) {
            var json = JSON.parse(body);
            var idReceived = json[0].id;
            expect(json.length).toBe(1);
            expect(idReceived).toEqual(id);
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("Get a render by type", function (done) {
        var type = "ng";
        request.get(baseUrl + "?type=" + type, function (err, res, body) {
            var json = JSON.parse(body);
            var typeReceived = json[0].type;
            expect(json.length).toBeGreaterThan(0);
            expect(typeReceived).toEqual(type);
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("Get non existing render by id", function (done) {
        var id = "prueba";
        request.get(baseUrl + "?id=" + id, function (err, res, body) {
            expect(res.statusCode).toBe(404);
            done();
        });
    });

    it("Get non existing render by type", function (done) {
        var type = "ng2";
        request.get(baseUrl + "?type=" + type, function (err, res, body) {
            expect(res.statusCode).toBe(404);
            done();
        });
    });

    it("Get render by id and type", function (done) {
        var id = "prueba";
        var type = "ng2";
        request.get(baseUrl + "?id=" + id + "&type=" + type, function (err, res, body) {
            expect(res.statusCode).toBe(400);
            done();
        });
    });

    it("Post without render", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: ''
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(400);
            done();
        });
    });

    it("Post without id", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "sampleModel": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.json",
                "view": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ang",
                "ctrl": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ctl",
                "type": "ng"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without sampleModel", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "id": "prueba",
                "view": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ang",
                "ctrl": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ctl",
                "type": "ng"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without view", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "id": "prueba",
                "sampleModel": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.json",
                "ctrl": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ctl",
                "type": "ng"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without ctrl", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "id": "prueba",
                "sampleModel": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.json",
                "view": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ang",
                "type": "ng"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without ctrl", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "id": "prueba",
                "sampleModel": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.json",
                "view": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ang",
                "ctrl": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ctl"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post render", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "id": "prueba",
                "sampleModel": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.json",
                "view": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ang",
                "ctrl": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ctl",
                "type": "ng"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("Check render has been created", function (done) {
        var id = "prueba";
        request.get(baseUrl + "?id=" + id, function (err, res, body) {
            var json = JSON.parse(body);
            var idReceived = json[0].id;
            expect(json.length).toBe(1);
            expect(idReceived).toEqual(id);
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("Check 2 render has been created", function (done) {
        request.get(baseUrl, function (err, res, body) {
            expect(res.statusCode).toBe(200);
            var json = JSON.parse(body);
            expect(json.length).toBe(3);
            done();
        });
    });

    it("Post conflict", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: {
                "id": "prueba",
                "sampleModel": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.json",
                "view": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ang",
                "ctrl": "https://ui-renders.herokuapp.com/app/states/renders/prueba/prueba.ctl",
                "type": "ng"
            }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(409);
            done();
        });
    });

    it("Delete render", function (done) {
        var id = "prueba";
        request.delete(baseUrl + "/" + id, function (err, res, body) {
            expect(res.statusCode).toBe(204);
            done();
        });
    });

    it("Check render has been deleted", function (done) {
        var id = "prueba";
        request.get(baseUrl + "?id=" + id, function (err, res, body) {
            expect(res.statusCode).toBe(404);;
            done();
        });
    });

    it("Check 2 render has been deleted", function (done) {
        request.get(baseUrl, function (err, res, body) {
            expect(res.statusCode).toBe(200);
            var json = JSON.parse(body);
            expect(json.length).toBe(2);
            done();
        });
    });

    it("Delete a non existing render", function (done) {
        var id = "prueba";
        request.delete(baseUrl + "/" + id, function (err, res, body) {
            expect(res.statusCode).toBe(404);
            done();
        });
    });

});