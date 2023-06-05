
const path = require('path')
const con = require('../config/DB_connection')


module.exports.home = (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/index.html'));
}

module.exports.create = (req, res) => {
    const { Fname, Lname, email, password } = req.body
    let sql = "INSERT INTO `carres`.`user` (`firstName`, `lastName`,`email`,`password`) VALUES ('" + Fname + "','" + Lname + "','" + email + "','" + password + "')"
    
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }

    }
    )
    return res.redirect("back")
}
module.exports.create_session = (req, res) => {
    if (req.isAuthenticated()) {

        return res.render('car_register');
    }
    return res.redirect('/')
}
module.exports.car_register = (req, res) => {
    const { Oname, Vname, palce_name, namePlate, Edate } = req.body
    let sql = "INSERT INTO `carres`.`reginfo` (`user`,`ownerName`, `vehicleName`,`parkingPlace`,`regdnumber`,`entryDate`,`exitDate`) VALUES('" + res.locals.user.firstName + "','" + Oname + "','" + Vname + "','" + palce_name + "','" + namePlate + "','" + Edate + "','" + Edate + "')"
    // console.log(req.body)
    con.query(sql, (err) => {
        if (err) {
            console.log(err)
        }

    }
    )



    return res.render('car_register');

   
}


module.exports.history = (req, res) => {
    let sql = "SELECT * FROM `carres`.`reginfo` WHERE user='" + res.locals.user.firstName + "';"
    // console.log(req.body)
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        // console.log(result)


        return res.render('carlist', { results: result }

        )

    }
    )
}


module.exports.admin = (req, res) => {
    const sqlUsers = 'SELECT * FROM carres.user ;'
    const sqlCars = 'SELECT * FROM carres.reginfo;'
 
    con.query(sqlUsers, (errUsers, resultsUsers) => {
        if (errUsers) throw errUsers;
    
        con.query(sqlCars, (errCars, resultsCars) => {
          if (errCars) throw errCars;

          return res.render('admin_panel', { users: resultsUsers, cars: resultsCars } );

        });
    });

 
}
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }

        return res.redirect('/')
    })

}
module.exports.delete_car = (req, res) => {

    let sql1 = "DELETE FROM `carres`.`reginfo` WHERE id ='" + req.params.id + "' ;"
    con.query(sql1, (err, result) => {
        if (err) {
            console.log(err)

        }
        return res.redirect('/back')
    }
    )

}
module.exports.delete_user = (req, res) => {
    
    let sql1 = "DELETE FROM `carres`.`user` WHERE id ='" + req.params.id + "' ;"
    con.query(sql1, (err, result) => {
        if (err) {
            console.log(err)

        }
        return res.redirect('back')
    }
    )

}


module.exports.registered_car = (req, res) => {
    let sql1 = " SELECT FROM `carres`.`user`; "
    con.query(sql1, (err, result) => {
        if (err) {

            console.log(err)

        }

        return res.redirect('/admin',{results: result})

    }
    )
}
