{
    'name': 'Owl',
    'version': '1.0',
    'author': 'Satish Prajapati',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/res_partner_views.xml',
        'views/todo_list_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'owl/static/src/components/*/*.js',
            'owl/static/src/components/*/*.xml',
            'owl/static/src/components/*/*.scss'
        ]
    }

}
