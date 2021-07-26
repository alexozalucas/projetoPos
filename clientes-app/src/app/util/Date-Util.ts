import { NgModule } from "@angular/core";

@NgModule({})
export class DateUtil {

  public static dateFormat(data: string): string {

    var retorno = "";
    if (data != undefined) {
      if (data.length == 8) {
        var dia = data.substring(0, 2);
        var mes = data.substring(2, 4);
        var ano = data.substring(4, 8);
        retorno = dia + "/" + mes + "/" + ano;
        if (!this.validateDate(retorno)) {
          retorno ="";         
        }
      }
    }
    return retorno;
  }


  public static validarValorDefault(valor: string) {

    if (valor == undefined || valor == "") {
      valor = "0";
    }
    return valor;
  }


  public static validateDate(data) {
   
    var regex = "\\d{2}/\\d{2}/\\d{4}";
    var dtArray = data.split("/");
    
    if (dtArray == null)
      return false;
 
    var dtDay = dtArray[0];
    var dtMonth = dtArray[1];
    var dtYear = dtArray[2];

    if (dtMonth < 1 || dtMonth > 12)
      return false;
    else if (dtDay < 1 || dtDay > 31)
      return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
      return false;
    else if (dtMonth == 2) {
      var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
      if (dtDay > 29 || (dtDay == 29 && !isleap))
        return false;
    }
    return true;
  }


}