let User = require("./model/user.model").User;
let Person = require("./model/person.model").Person;
let Address = require("./model/address.model").Adress;
let Role = require("./model/role.model").Role;
let Log = require("./model/log.model").Log;
let Skill = require("./model/skill.model").Skill;
let Resource = require("./model/resource.model").Resource;
let Offer = require("./model/offer.model").Offer;
let Region = require("./model/region.model").Region;
let Dossier = require("./model/dossier.model").Dossier;
let Relation = require("./model/relation.model").Relation;
let Activity = require("./model/activity.model").Activity;
let Money = require("./model/money.model").Money;
let Condition = require("./model/condition.model").Condition;
let Shipping = require("./model/shipping.model").Shipping;
let Demand = require("./model/demand.model").Demand;
let Transaction = require("./model/transaction.model").Transaction;

let {sequelize, Sequelize} = require("./connection");

function initRoles() {
    return Role.findAll().then(roles => {
        if (!roles.length) {
            return Role.bulkCreate([
                {name: "ROLE_USER"},
                {name: "ROLE_ADMIN"},
                {name: "ROLE_GM"},
                {name: "ROLE_LV"},
                {name: "ROLE_VOLUNTEER"}
            ]).then(() => {
                return Role.findAll();
            }).then(roles => roles);
        } else {
            return roles;
        }
    });
}

module.exports = {
    init() {
        //Define relationships between data models
        User.Person = User.hasOne(Person);
        User.Logs = User.hasMany(Log, {as: "history"});
        User.Roles = User.belongsToMany(Role, {through: "user_role"});

        Offer.Resources = Offer.belongsToMany(Resource, {through: "offer_resource"});
        Offer.Location = Offer.belongsToMany(Address, {through: "offer_location"});
        Offer.Shipping = Offer.hasMany(Shipping);
        Offer.Condition = Offer.belongsToMany(Condition, {through: "offer_condition"});

        Demand.Resources = Demand.belongsToMany(Resource, {through: "demand_resource"});
        Demand.Condition = Demand.belongsToMany(Condition, {through: "demand_condition"});

        Role.belongsToMany(User, {through: "user_role"});

        Person.Addressses = Person.belongsToMany(Address, {through: "person_address"});
        Person.Regions = Person.belongsToMany(Region, {through: "person_region"});
        Person.Dossiers = Person.belongsToMany(Dossier, {through: "person_dossier"});
        Person.Skills = Person.hasMany(Skill);
        Person.Relations = Person.belongsToMany(Relation, {through: "person_relation"});
        Person.Offers = Person.belongsToMany(Offer, {through: "person_offer"});
        Person.Demands = Person.belongsToMany(Demand, {through: "person_demand"});
        Person.Activities = Person.belongsToMany(Activity, {through: "activity_person"});

        Relation.Person = Relation.hasOne(Person, {through: "person_relation"});

        Region.Persons = Region.belongsToMany(Person, {through: "person_region"});

        Dossier.Persons = Dossier.belongsToMany(Person, {through: "person_dossier"});

        Activity.Persons = Activity.belongsToMany(Person, {through: "activity_person"});
        Activity.Location = Activity.belongsToMany(Address, {through: "activity_location"});
        Activity.Budget = Activity.belongsToMany(Money, {through: "budget_money"});

        Condition.Price = Condition.belongsToMany(Money, {through: "condition_money"});

        Transaction.Seller = Transaction.belongsTo(Person, {as: "seller"});
        Transaction.Buyer = Transaction.belongsTo(Person, {as: "buyer"});
        Transaction.Offer = Transaction.belongsTo(Offer);
        Transaction.Demand = Transaction.belongsTo(Demand);

        // create all the defined tables in the specified database
        sequelize.sync()
            .then(() => {
                initRoles().then(() => {
                    console.log('Tables have been successfully created, if one doesn\'t exist');
                });
            }).catch(error => console.log('This error occured', error));
    },
    models: {
        User,
        Person,
        Address,
        Role,
        Log,
        Skill,
        Resource,
        Offer,
        Region,
        Relation,
        Dossier,
        Activity,
        Money,
        Condition,
        Shipping,
        Demand,
        Transaction
    },
    operators:
        {
            Op: Sequelize.Op
        }
};