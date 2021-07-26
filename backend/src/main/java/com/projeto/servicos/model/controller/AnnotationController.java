package com.projeto.servicos.model.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.servicos.model.controller.dto.AnnotationDTO;
import com.projeto.servicos.model.entity.Annotation;
import com.projeto.servicos.model.entity.TypeAnnotation;
import com.projeto.servicos.model.repository.AnnotationRepository;
import com.projeto.servicos.model.repository.TypeAnnotationRepository;

@RestController
@RequestMapping("/api/annotation")
public class AnnotationController {

	@Autowired
	private TypeAnnotationRepository typeAnnotationRepository;

	@Autowired
	private AnnotationRepository annotationRepository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Annotation saveAnnotation( @Valid @RequestBody AnnotationDTO annotationDTO) {
		
	
		if(annotationDTO.getTypeAnnotation().getId() == null) {
			annotationDTO.getTypeAnnotation().setId((long) 0);			
		}

		TypeAnnotation typeAnnotation = typeAnnotationRepository.findById(annotationDTO.getTypeAnnotation().getId())
				.orElseThrow(
						() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de anotação não encontrado"));

		Annotation annotation = new Annotation();
		annotation.setId(annotationDTO.getId());
		annotation.setTitle(annotationDTO.getTitle());
		annotation.setAnnotation(annotationDTO.getAnnotation());
		annotation.setTypeAnnotation(typeAnnotation);

		return annotationRepository.save(annotation);

	}

	@PutMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void updateAnnotation(@RequestBody @Valid AnnotationDTO annotationDTO) {

	
		
		TypeAnnotation typeAnnotation = typeAnnotationRepository.findById(annotationDTO.getTypeAnnotation().getId())
				.orElseThrow(
						() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de anotação não encontrado"));

		Annotation annotation = annotationRepository.findById(annotationDTO.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Anotação não encontrado"));

		annotation.setId(annotationDTO.getId());
		annotation.setTitle(annotationDTO.getTitle());
		annotation.setAnnotation(annotationDTO.getAnnotation());
		annotation.setTypeAnnotation(typeAnnotation);

		annotationRepository.save(annotation);

	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteAnnotation(@PathVariable Long id) {

		Annotation annotation = annotationRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Anotação não encontrado"));

		annotationRepository.delete(annotation);
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Annotation> getAllAnnotation() {
		
		
		return annotationRepository.findAll();
	}
	
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Annotation getAnnotationById(@PathVariable Long id) {
		
		Annotation annotation = annotationRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Anotação não encontrado"));
		
		return annotation;
	}
	
	@PostMapping("/typeannotation")
	@ResponseStatus(HttpStatus.CREATED)
	public TypeAnnotation saveTypeAnnotation(@RequestBody @Valid TypeAnnotation typeAnnotation) {

		
		if (typeAnnotationRepository.existsByTypeIgnoreCase(typeAnnotation.getType())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Tipo de anotação já cadastrado");
		}
		
		return typeAnnotationRepository.save(typeAnnotation);

	}
	
	
	@PutMapping("/typeannotation")
	@ResponseStatus(HttpStatus.CREATED)
	public TypeAnnotation updateTypeAnnotation(@RequestBody @Valid TypeAnnotation typeAnnotation) {

		TypeAnnotation type = typeAnnotationRepository.findById(typeAnnotation.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de anotação não encontrado"));

		boolean exists = typeAnnotationRepository.existsByTypeIgnoreCase(typeAnnotation.getType());
		
		if (!typeAnnotation.getType().equalsIgnoreCase(type.getType()) && exists) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Tipo de anotação já cadastrado");
		}
		
		return typeAnnotationRepository.save(typeAnnotation);

	}
	
	
	@GetMapping("/typeannotation")
	@ResponseStatus(HttpStatus.OK)
	public List<TypeAnnotation> getAllTypeAnnotation() {
		return typeAnnotationRepository.findAll();
	}
	
	@GetMapping("/typeannotation/{id}")
	@ResponseStatus(HttpStatus.OK)
	public TypeAnnotation getTypeAnnotationById(@PathVariable Long id) {
		
		TypeAnnotation type = typeAnnotationRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de anotação não encontrado"));
		
		return type;
	}
	
	
	@DeleteMapping("/typeannotation/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		
		TypeAnnotation typeAnnotation = typeAnnotationRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de anotação não encontrado"));
		
		if(annotationRepository.existsByTypeAnnotation(typeAnnotation)) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "O tipo de anotação está vinculado a uma anotação!");
		}		
		typeAnnotationRepository.delete(typeAnnotation);

	}
	

}
