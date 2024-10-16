import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {
  evaluacionForm: FormGroup;
  evaluacionPrevia: any = null;

  constructor(private fb: FormBuilder, private modalController: ModalController) {
    this.evaluacionForm = this.fb.group({
      objetivo: ['', Validators.required],
      historial: ['', Validators.required],
      conocimiento: ['', Validators.required],
      frecuencia: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      hora: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(30)]],
      altura: ['', [Validators.required, Validators.min(100)]]
    });
  }
  
  ngOnInit() {
    const storedEvaluacion = localStorage.getItem('evaluacionPrevia');
    if (storedEvaluacion) {
      this.evaluacionPrevia = JSON.parse(storedEvaluacion);
    }
  }

  onSubmit() {
    if (this.evaluacionForm.valid) {
      localStorage.setItem('evaluacionPrevia', JSON.stringify(this.evaluacionForm.value));
      console.log('Evaluación actual guardada:', this.evaluacionForm.value);
      this.evaluacionForm.reset();
    } else {
      console.log('Formulario no válido');
    }
  }
  async abrirEvaluacion() {
    console.log('Método abrirEvaluacion llamado'); // Asegúrate de que esto se imprima en la consola
    const modal = await this.modalController.create({
      component: EvaluacionComponent, // Asegúrate de que este componente existe y está correctamente importado
    });
    await modal.present();
  }
  nuevaEvaluacion() {
    this.evaluacionForm.reset();
    console.log('Nueva evaluación iniciada');
  }
  cerrarModal() {
    console.log('Cerrando modal');
    this.modalController.dismiss();
  }
}
