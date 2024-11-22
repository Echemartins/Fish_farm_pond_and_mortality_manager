const PondModel = require("../models/pondModel");
const Mortality = require("../models/mortalityModel");

const mortalityController = {
    addMortality: async (req, res) => {
        try {
            const { pondId } = req.params;

            const { quantity, comment, date } = req.body;
            console.log({pondId, body: req.body});
            const selectedPond = await PondModel.findOne({_id: pondId})
            
            const newMortality = await Mortality.create({
                pondId,
                quantity,
                date,
                comment,
            });
            selectedPond.mortalities.push(newMortality._id)
            await selectedPond.save()
            return res.redirect("/");

            // res.status(200).json({message:'mortality recorded', data:newMortality})
            // res.render('/', newMortality)
        } catch (error) {
            console.log(error);
        }
    },

    getAllMortalities: async (req, res) => {
        try {
            const { pondId } = req.params;

            // Find all mortality records for the specified pond
            const mortalities = await Mortality.find({ pondId }).sort({
                date: -1,
            });

            if (!mortalities || mortalities.length === 0) {
                return res
                    .status(404)
                    .json({
                        message: "No mortality records found for this pond",
                    });
            }

            res.status(200).json(mortalities);
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving mortalities",
                error,
            });
        }
    },
};

module.exports = mortalityController;
