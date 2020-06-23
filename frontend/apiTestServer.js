const jsonServer = require("json-server");
const server = jsonServer.create();

const fs = require("fs");

// EXAMPLE
const rawMockDb = fs.readFileSync("mockend/mockDb.json");
const mockDb = JSON.parse(rawMockDb);

// SCHEDULER EVENTS
const rawMockDbSchedulerEvents = fs.readFileSync("mockend/mockDbSchedulerEvents.json");
const mockDbSchedulerEvents = JSON.parse(rawMockDbSchedulerEvents);

// SCHEDULER RESOURCES
const rawMockDbSchedulerResources = fs.readFileSync("mockend/mockDbSchedulerResources.json");
const mockDbSchedulerResources = JSON.parse(rawMockDbSchedulerResources);

// TAGS
const rawMockDbTagsData = fs.readFileSync("mockend/mockDbTagsData.json");
const mockDbTagsData = JSON.parse(rawMockDbTagsData);

const rawMockDbTagCategoriesData = fs.readFileSync("mockend/mockDbTagCategories.json");
const mockDbTagCategoriesData = JSON.parse(rawMockDbTagCategoriesData);

function respond(res, response = {}, options = {}) {
    options = {
        status: 200,
        timeOut: 0,
        ...options
    };

    setTimeout(() => {
        if (options.status === 200) {
            res.jsonp(response);
        } else {
            res.status(options.status).jsonp(response);
        }
    }, options.timeOut);
}

// disable CORS
const middlewares = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cache-control, expires, pragma, pwc-authorization-token, pwc-refresh-token");
    next();
};

server.use(middlewares);
server.use(jsonServer.bodyParser);

// EXAMPLE LIST
server.get("/api/v1/listData", (req, res) => respond(res, mockDb.listData));
server.post("/api/v1/listData", (req, res) => respond(res, {
    id: Math.floor((Math.random() * 1000000) + 5),
    text: req.body.text
}));
server.delete("/api/v1/listData/:id", (req, res) => respond(res, {}));

// SCHEDULER
server.get("/api/v1/schedulerResources", (req, res) => respond(res, mockDbSchedulerResources.schedulerResources));
server.get("/api/v1/schedulerEvents", (req, res) => respond(res, mockDbSchedulerEvents.schedulerEvents));
server.post("/api/v1/schedulerEvents", (req, res) => {
    respond(res, {
        id: Math.floor((Math.random() * 1000000) + 5),
        start: req.body.start,
        end: req.body.end,
        resourceId: req.body.resourceId,
        resourceName: req.body.resourceName,
        title: req.body.title,
        isApproved: req.body.isApproved,
        item: req.body.item
    })
});
server.put("/api/v1/schedulerEvents/:id", (req, res) => {
    respond(res, {
        event: req.body.event,
        start: req.body.start,
        end: req.body.end,
        resourceId: req.body.resourceId,
        resourceName: req.body.resourceName,
        title: req.body.title,
        isApproved: req.body.isApproved,
        item: req.body.item
    })
});
server.delete("/api/v1/schedulerEvents/:id", (req, res) => respond(res, {}));

// TAGS
server.get("/api/v1/categoriesData", (req, res) => respond(res, mockDbTagCategoriesData.categoriesData));
server.get("/api/v1/tagsData", (req, res) => respond(res, mockDbTagsData.tagsData));
server.post("/api/v1/tagsData", (req, res) => {
    respond(res, {
        id: Math.floor((Math.random() * 1000000) + 5),
        tagName: req.body.tagName,
        Categories: req.body.categories
    })
});
server.put("/api/v1/tagsData/:id", (req, res) => {
    respond(res, {
        tagName: req.body.tagName,
        Categories: req.body.categories
    })
});
server.delete("/api/v1/tagsData/:id", (req, res) => respond(res, {}));

// SERVER
server.listen(3000, () => console.log("JSON Server is running"));