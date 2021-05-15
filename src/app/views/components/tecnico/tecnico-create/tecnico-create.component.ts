import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: 'Rui Pinto',
    cpf: '358.901.010-05',
    telefone: '(00) 90011-8001'
  }

  constructor(
    private service : TecnicoService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  cancel():void {
    this.router.navigate(['tecnicos'])
  }

  create():void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Tecnico Criado com Sucesso!')
    }, err => {
      console.log(err)
      if(err.error.error.match('já cadastrado')){
        this.service.message(err.error.error)
      }
    })
  }

}
