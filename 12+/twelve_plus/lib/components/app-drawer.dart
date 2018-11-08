import 'package:flutter/material.dart';
import '../calendar.dart';
import '../resources.dart';
import '../main.dart';

class AppDrawer extends StatefulWidget {
  final callback;
  final String currentPage;
  AppDrawer({Key key, String this.currentPage, this.callback}) : super(key: key);

  bool _isCurrentPage(String name) {
    return name == currentPage;
  }

  @override
  State createState() => new AppDrawerState(callback);
}

class NavigationItem {
  final String title;
  final IconData icon;
  final Widget page;
  NavigationItem(this.title, this.icon, this.page);
}

class AppDrawerState extends State<AppDrawer> {
  int _selectedIndex = 0;
  final callback;
  AppDrawerState(this.callback);

  final drawerItems = [
    new NavigationItem("Aeroplane", Icons.local_airport, new CalendarPage()),
    new NavigationItem("Pizza", Icons.local_pizza, new ResourcesPage()),
    new NavigationItem("Coffee", Icons.local_cafe, new App())
  ];

  _onSelectItem(int index, Widget page) {
    setState(() {
      _selectedIndex = index;
      this.callback(page);
    });
  }

  _buildDrawerItems(){
    List<ListTile> list = new List<ListTile>();
    for (var i = 0; i < this.drawerItems.length; i++) {
      final item = this.drawerItems[i];
      list.add(new ListTile(
        title: new Text(item.title),
        onTap: () {
          _onSelectItem(i, item.page);
          /*Navigator.pop(context);
          Navigator.of(context).push(
            new MaterialPageRoute(
              builder: (BuildContext context) => item.page
            )
          );*/
        },
      ));
    }
    list.add(new ListTile(
      title: new Text('$_selectedIndex')
    ));
    return list;
  }

  Widget build(BuildContext context) {
    return new Drawer(
      child: new ListView(
        children: _buildDrawerItems()
      )
    );
  }
}


var drawer = new AppDrawer();