import 'package:flutter/material.dart';
import 'components/app-drawer.dart';
import 'main.dart';
import 'resources.dart';

// class CalendarPage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Calendar',
//       theme: new ThemeData( 
//         primaryColor: Colors.blueGrey,
//       ),
//       home: new Scaffold(
//         appBar: new AppBar(title: new Text('Calendar')),
//         drawer: new AppDrawer(currentPage: '/calendar'),
//         body: new Text('sup'),
//       ),
//       routes: <String, WidgetBuilder> {
//         '/calendar': (BuildContext context) => CalendarPage(),
//         '/home': (BuildContext context) => App(),
//         '/resources': (BuildContext context) => ResourcesPage()
//       },
//     );
//   }
// }

class CalendarPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Text('sup');
  }
}