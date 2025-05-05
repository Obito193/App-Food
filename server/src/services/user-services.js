const sql = require("../configs/database-config");

class UserServices {
  static registerAccount(data) {
    const { user_name, user_avatar, email, password, role = 'normal' } = data;
    return new Promise((resolve, reject) => {
      sql.query("SELECT user_id FROM `user` WHERE `email` = ?", [email], (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        if (res.length > 0) {
          return resolve({ message: "Email already registered" });
        } else {
          sql.query(
            "INSERT INTO `user` (`user_name`, `user_avatar`, `email`, `password`, `role`) VALUES (?, ?, ?, ?, ?)",
            [user_name, user_avatar, email, password, role],
            (err, res) => {
              if (err) {
                console.log(err);
                return reject(err);
              }

              const user_id = res.insertId;
              return resolve({
                email: email,
                user_id: user_id,
                user_name: user_name,
                user_avatar: user_avatar,
                role: role
              });
            }
          );
        }
      });
    });
  }

  static loginAccount(data) {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT user_id, role, user_name, user_avatar FROM `user` WHERE `email` = ? AND `password` = ?",
        [email, password],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          if (res.length > 0) {
            return resolve({
              email: email,
              user_id: res[0].user_id,
              role: res[0].role,
              user_name: res[0].user_name,
              user_avatar: res[0].user_avatar,
            });
          } else {
            return resolve({
              message: "Invalid email or password"
            });
          }
        }
      );
    });
  }
  static updateProfile(data) {
    const { user_id, user_name, user_avatar } = data;
    return new Promise((resolve, reject) => {
      const fieldsToUpdate = [];
      const values = [];

      if (user_name) {
        fieldsToUpdate.push("user_name = ?");
        values.push(user_name);
      }

      // Check for user_avatar explicitly, including null, to allow clearing the avatar
      if (user_avatar !== undefined) {
        fieldsToUpdate.push("user_avatar = ?");
        values.push(user_avatar);
      }

      if (fieldsToUpdate.length === 0) {
        return resolve({ message: "No data to update" });
      }

      values.push(user_id);

      const query = `UPDATE \`user\` SET ${fieldsToUpdate.join(", ")} WHERE user_id = ?`;

      sql.query(query, values, (err, res) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve({
          user_name: user_name,
          user_avatar: user_avatar
        })
      });
    });
  }

}

module.exports = UserServices;
