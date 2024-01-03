from odoo import models, fields


class TodoList(models.Model):
    _name = 'todo.list'
    _description = "Todo list"

    name = fields.Char(string="Task name")
    completed = fields.Boolean(string="Is Completed?")
    color = fields.Char(string="Task color")
