require('dotenv').config()
const csv = require('csv-parser');
const fs = require('fs');

accountSid = process.env.accountSid;
authToken = process.env.authToken;


const client = require('twilio')(accountSid, authToken);

exports.sendmessagewithtwilio = (payload, res) => {
    var message = 'hello, abhinay this side.'

    res.send(' refress to send a whatsapp message  ' + message)
    client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+919755582435',
        body: message
    })
        .then((res) => console.log("sent message successfully.."))
        .catch((err) => {
            console.log(err)
        })
}

exports.sendsmswithtwilio = (payload, res) => {

    client.messages
        .create({
            body: 'hello, devil this side',
            messagingServiceSid: 'MG7bb641e5ed2b35129b1206b7610273a2',
            to: '+919755582435'
        })
        .then(message => res.send('done...'))
        .done();

}

//===========
exports.sendmessagewithmsgbird = (payload, res) => {

    var messagebird = require('messagebird')("AqSo7w6VumVrn5RK7ReDNksWI", null, ["ENABLE_CONVERSATIONSAPI_WHATSAPP_SANDBOX"]);
    res.send('messageBird')

    messagebird.conversations.start({
        'to': '919755582435',
        'channelId': '7492f557f27947518c0ee381ead50767',
        'type': 'hsm',
        'content': {
            'hsm': {
                'namespace': 'fc903f7e_9c8f_406d_b420_e9cc03a9162f',
                'templateName': 'support',
                'language': {
                    'policy': 'deterministic',
                    'code': 'en'
                },
                'params': [
                    { "default": "Roberto" },
                    { "default": "123" },
                    { "default": "new coffee machine" },
                    { "default": "MessageBird, Trompenburgstraat 2C, 1079TX Amsterdam" }
                ]
            }
        }
    }, function (err, response) {
        if (err) {
            return console.log(err);
        }
        console.log(response);
    });
}

exports.readcsvtoboj = (payload, res) => {
    const result = [];


    fs.createReadStream(__dirname + '/../csv/an_csv2.csv')
        .pipe(csv())
        .on('data', (row) => {
            console.log(row);
            result.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });

    res.json(result[0])

}

exports.writecsvtoboj = (payload, res) => {

    const createcsvwri = require('csv-writer').createObjectCsvWriter


    const csv = createcsvwri({
        path: __dirname + '/../csv/an_csv.csv',
        header: [
            { id: 'section', title: 'section' },
            { id: 'question', title: 'question' }]
    });
    const record = [{
        section: "metaporlism",
        question: "Change in the food habits "
    },
    {
        section: "metaporlism",
        question: "other",
    }]

    csv.writeRecords(record)
        .then(() => {
            console.log("done")
        })

}


exports.appendoncsv = (payload, res) => {

    const json2csv = require('json2csv').parse
    const newline = '\r\n'

    var fields = ['section', 'question']

    var appendThis = [
        { section: "xyz", question: " zxy" }
    ]

    var toCsv = {
        data: appendThis,
        fields: fields,
        header: false,
    };

    fs.stat(__dirname + '/../csv/an_csv.csv', function (err, stat) {
        if (err == null) {
            console.log('File exists');

            //write the actual data and end with newline
            var csv = json2csv(toCsv) + newline;

            fs.appendFile(__dirname + '/../csv/an_csv.csv', csv, function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        } else {
            //write the headers and newline
            console.log('New file, just writing headers');
            fields = fields + newLine;

            fs.writeFile(__dirname + '/../csv/an_csv.csv', fields, function (err) {
                if (err) throw err;
                console.log('file saved');
            });
        }
    });

}
