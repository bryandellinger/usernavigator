import '@babel/polyfill';
import '../node_modules/toastr/build/toastr.css';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'jquery-validation';
import * as Toastr from 'toastr';
import Users from './users';
import initSearchForm from './initSearchForm';

window.Toastr = Toastr;

$(() => {
  const users = new Users();
  users.init();
  initSearchForm();
});
