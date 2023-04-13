'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        queryInterface.addConstraint('Publicacion' ,{
            fields: ['UserId'],
            type: 'foreign key',
            name:'user-publicacion-asociation',
            references: {
                table:'Users',
                field: 'id'
            }
        });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
