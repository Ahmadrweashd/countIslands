import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/islands/:id').get((req, res) => {
    if (req.params.id != 0) {
        Issue.findById(req.params.id, (err, island) => {
            if (err)
                console.log(err);
            else
                {
                    let fix = [];
                    fix.push(island);
                    res.json(fix);
                }
        });
    } else {
        Issue.find((err, issues) => {
            if (err)
                console.log(err);
            else
                res.json(issues);
        });
    }

});

router.route('/islands/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, island) => {
        if (err)
            console.log(err);
        else
            res.json(island);
    });
});

router.route('/islands/add').post((req, res) => {
    let issue = new Issue(req.body);
    console.log(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({
                'issue': 'Added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/islands/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, island) => {
        if (!island) {
            res.statusCode = 403;
            res.send("Island was not found!");
        } else {
            island.date = req.body.date;
            island.matrix = req.body.matrix;

            island.save().then(island => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/islands/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({
        _id: req.params.id
    }, (err, island) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));