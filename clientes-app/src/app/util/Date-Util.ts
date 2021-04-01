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


  

}