const moment = require("moment");
const Session = require("../models/session.model");

module.exports.getSessions = (req, res) => {
    Session.find({})
        .then((values) => {
            res.statusCode = 200;
            res.json({sessions: values});
        })
        .catch((err) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

// FILTRAR POR LA FECHA DE HOY
module.exports.getTodaySessions = (req, res) => {
    let date = moment();
    let formattedDate = date.format('L');
    Session.find({date: formattedDate})
        .then((values) => {
            res.statusCode = 200;
            res.json({sessions: values});
        })
        .catch((err) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

module.exports.getOneSession = (req, res) => {
    Session.findById(req.params.id)
        .then((session) => {
            res.statusCode = 200
            res.json(session);
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

module.exports.createSession = (req, res) => {
    Session.create(req.body)
        .then(newSession => res.json({session : newSession}))
        .catch(err => res.json({msg: "ERROR", error: err}));
}

module.exports.editSession = (req, res) => {
    Session.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(updatedSession => res.json(updatedSession))
    .catch(err => console.log(err));
}

module.exports.deleteSession = (req, res) => {
    Session.findByIdAndDelete(req.params.id)
    .then( deletedSession => {
    console.log("Recurso borrado con éxito", deletedSession);
        res.status(200).json({ message: "Recurso deleted successfully", deletedSession });
    })
    .catch(err => {
        console.error("Error deleting session:", err);
        res.status(500).json({ error: err.message });
    });
}

module.exports.getAvgTime = (req, res) => {
    Session.aggregate(
      [
        {
          '$group': {
            '_id': '$date', 
            'totalSecondsPerDate': {
              '$sum': '$timeInSeconds'
            }
          }
        }, {
          '$group': {
            '_id': null, 
            'totalDates': {
              '$sum': 1
            }, 
            'totalAggregateTime': {
              '$sum': '$totalSecondsPerDate'
            }, 
            'maxTime': {
              '$max': '$totalSecondsPerDate'
            }
          }
        }, {
          '$project': {
            'maxTime': '$maxTime', 
            'totalDates': '$totalDates', 
            'averageTimePerDate': {
              '$divide': [
                '$totalAggregateTime', '$totalDates'
              ]
            }
          }
        }
      ]
    ).then(result => {
      console.log(result[0].averageTimePerDate);
      res.status(200).json({
        maxTime : result[0].maxTime,
        totalDates : result[0].totalDates,
        avgTime : result[0].averageTimePerDate});
      /* Handle the result here
      if (result.length > 0) {
          const averageTimePerDate = result[0].averageTimePerDate;
          res.status(200).json({ avgTimePerDate: averageTimePerDate });
      } else {
          // Handle case when there are no sessions
          res.status(200).json({ avgTimePerDate: 0 });
      }*/
  }).catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
  });
}



