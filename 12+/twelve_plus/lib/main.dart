import 'package:flutter/material.dart';
import 'calendar.dart';
import 'components/app-drawer.dart';
import 'resources.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      theme: new ThemeData(          // Add the 3 lines from here... 
        primaryColor: Colors.blueGrey,
      ),
      home: new MainScaffold(),
      routes: <String, WidgetBuilder> {
        '/calendar': (BuildContext context) => CalendarPage(),
        '/home': (BuildContext context) => MainScaffold(),
      },
    );
  }
}

class MainScaffold extends StatefulWidget {
  @override
  State createState() => new MainScaffoldState();
}

class MainScaffoldState extends State<MainScaffold> {
  GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey();
  Widget page = new CalendarPage();
  _openMenu() {
    _scaffoldKey.currentState.openDrawer();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
        appBar: new AppBar(
          title: new Text('12+'),
        ),
        drawer: new AppDrawer(currentPage: '/home', callback: (index){
          setState((){
            page = index;
          });
        }),
        body: new Center(child: page),
      );
  }
}